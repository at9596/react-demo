class MatricSnapshotJob < ApplicationJob
  private

  def execute(*args)
    JobMetricSnapshot.create!(
      ::MetricsService.call
    )
  end
end