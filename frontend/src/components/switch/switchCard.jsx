import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card1";
import { formatDate } from "@/utils/time-functions";

const Switch = ({ checked, onChange }) => {
  return (
    <label className="relative flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition duration-300 relative">
        <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${checked ? "translate-x-7" : ""}`}></div>
      </div>
    </label>
  );
};

const SwitchCard = ({ sensor, sensorData, onSwitchChange }) => {
  const lastData = sensorData.length > 0 ? sensorData[sensorData.length - 1] : null;
  const [isChecked, setIsChecked] = useState((lastData?.value === 1)? true : false);

  useEffect(() => {
    setIsChecked((lastData?.value === 1)? true : false);
  }, [lastData]);

  const handleSwitchChange = () => {
    const newValue = isChecked ? 0 : 1;
    setIsChecked(!isChecked);
    onSwitchChange(sensor.id, newValue);
  };

  return (
    <Card className="bg-secondary rounded-2xl shadow-xl w-80 md:w-64 lg:w-72 max-w-full mb-6">
      <CardHeader className="flex items-center rounded-t-2xl bg-gray-900 text-white p-4 pb-6">
        <CardTitle className="text-xl font-bold text-center">
          {sensor.name}
        </CardTitle>
        <CardDescription className="text-lg font-medium text-center text-slate-300">{sensor.type}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <span className={`px-5 py-2 my-5 text-sm font-semibold rounded-full tracking-wider cursor-pointer ${isChecked ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          { isChecked ? "ON" : "OFF" }
        </span>
        <p className="text-gray-700 text-sm text-center font-medium">
          Last modified
          <span className={'flex justify-center font-bold ml-1'}>
            {sensorData.length > 0 ? formatDate(sensorData[sensorData.length - 1].timestamp) : "N/A"}
          </span>
        </p>
      </CardContent>

      <CardFooter className="px-4 pt-1 pb-6 flex justify-center">
        <Switch checked={isChecked} onChange={handleSwitchChange} />
      </CardFooter>
    </Card>
  );
};

export default SwitchCard;