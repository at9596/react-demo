class CreateJobMetricSnapshots < ActiveRecord::Migration[8.1]
  def change
    create_table :job_metric_snapshots do |t|
      t.integer :processed
      t.integer :failed
      t.integer :busy_workers
      t.json :queues_data
      t.timestamps
    end
  end
end
