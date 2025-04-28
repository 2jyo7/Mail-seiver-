interface AnalyticsPanelProps {
  totalEmails: number;
  categoryCounts: { [key: string]: number };
}

export default function AnalyticsPanel({
  totalEmails,
  categoryCounts,
}: AnalyticsPanelProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Analytics</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-gray-700 font-medium">
          <span>Total Emails:</span>
          <span>{totalEmails}</span>
        </div>
        {Object.entries(categoryCounts).map(([category, count]) => (
          <div
            key={category}
            className="flex justify-between text-sm text-gray-600"
          >
            <span>{category}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
