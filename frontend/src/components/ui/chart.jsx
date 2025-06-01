"use client";

import { createContext, useContext, useId, useMemo } from "react";
import { Legend, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/utils/classes";

const THEMES = { light: "", dark: ".dark" };

const ChartContext = createContext(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <Chart />");
  }
  return context;
}

const Chart = ({ id, className, children, config, ...props }) => {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
};

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = Tooltip;

const ChartTooltipContent = ({
  active,
  payload,
  className,
  hideLabel = false,
  hideIndicator = false,
  indicator = "dot",
  nameKey,
  labelKey,
  label,
  formatter,
  labelFormatter,
  labelClassName,
  unit
}) => {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) return null;

    const [item] = payload;
    if (!item) return null;

    const key = labelKey || item.dataKey || item.name || "value";
    const itemConfig = config[key] || {};
    const value =
      !labelKey && typeof label === "string"
        ? config[label]?.label || label
        : itemConfig.label;

    if (labelFormatter)
      return (
        <div className={labelClassName}>{labelFormatter(value, payload)}</div>
      );

    return value ? <div className={labelClassName}>{value}</div> : null;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "min-w-auto text-center rounded-lg border bg-slate-200 p-3 text-xs shadow-xl",
        className
      )}
    >
      {tooltipLabel}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = nameKey || item.name || item.dataKey || "value";
          const itemConfig = config[key] || {};
          const indicatorColor = item.payload.fill || item.color;

          return (
            <div key={item.dataKey} className="flex gap-2 justify-between items-center">
              <div className="flex items-center gap-2">
                {!hideIndicator && (
                  <div
                    className="h-2 w-2 rounded"
                    style={{ backgroundColor: indicatorColor }}
                  />
                )}
                <span className="text-muted-fg">
                  {itemConfig.label || item.name}
                </span>
              </div>
              {item.value !== undefined && (
                <span className="font-medium">
                  {item.value.toLocaleString()} {unit} {/* Display unit */}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChartLegend = Legend;

export { Chart, ChartTooltip, ChartTooltipContent, ChartLegend, ChartStyle };
