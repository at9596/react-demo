# app/controllers/api/v1/metrics_controller.rb

class Api::V1::MetricsController < ApplicationController
  def history
    snapshots = JobMetricSnapshot
      .order(created_at: :asc)
      .last(60)

    render json: snapshots.map { |snapshot|
      {
        timestamp: snapshot.created_at,
        processed: snapshot.processed,
        failed: snapshot.failed,
        busy_workers: snapshot.busy_workers
      }
    }
  end
end
