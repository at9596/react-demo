# app/services/metrics_service.rb

class MetricsService
  def self.call
    stats = Sidekiq::Stats.new

    {
      processed: stats.processed,
      failed: stats.failed,
      busy_workers: Sidekiq::Workers.new.size,
      queues_data: Sidekiq::Queue.all.map do |queue|
        {
          name: queue.name,
          size: queue.size,
          latency: queue.latency.round(2)
        }
      end
    }
  end
end