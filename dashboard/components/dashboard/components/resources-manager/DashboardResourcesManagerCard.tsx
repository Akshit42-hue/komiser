import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Dispatch, SetStateAction } from 'react';
import { Doughnut } from 'react-chartjs-2';
import SelectCheckbox from '../../../select-checkbox/SelectCheckbox';
import Select from '../../../select/Select';
import {
  ResourcesManagerData,
  ResourcesManagerQuery
} from './hooks/useResourcesManager';
import useResourcesManagerChart from './hooks/useResourcesManagerChart';

ChartJS.register(ArcElement, Tooltip, Legend);

type DashboardResourcesManagerCardProps = {
  data: ResourcesManagerData | undefined;
  query: ResourcesManagerQuery;
  setQuery: Dispatch<SetStateAction<ResourcesManagerQuery>>;
  exclude: string[];
  setExclude: Dispatch<SetStateAction<string[]>>;
};

function DashboardResourcesManagerCard({
  data,
  query,
  setQuery,
  exclude,
  setExclude
}: DashboardResourcesManagerCardProps) {
  const { chartData, options, select, handleChange } = useResourcesManagerChart(
    { data, setQuery, initialQuery: query }
  );

  return (
    <div className="w-full rounded-lg bg-white py-4 px-6 pb-6">
      <div className="-mx-6 flex items-center justify-between border-b border-black-200/40 px-6 pb-4">
        <div>
          <p className="text-sm font-semibold text-black-900">
            Resources manager
          </p>
          <div className="mt-1"></div>
          <p className="text-xs text-black-300">
            Uncover how your resources are distributed
          </p>
        </div>
        <div className="h-[60px]"></div>
      </div>
      <div className="mt-4"></div>
      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Group by"
          value={query}
          values={select.values}
          displayValues={select.displayValues}
          handleChange={handleChange}
        />
        <SelectCheckbox
          label="Exclude"
          setExclude={setExclude}
          exclude={exclude}
          query={query}
        />
      </div>
      <div className="mt-4"></div>
      <div>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

export default DashboardResourcesManagerCard;
