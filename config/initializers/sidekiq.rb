# Shared Redis configuration
# so server and client always use the same connection settings.
REDIS_CONFIGURATION = {
  url: ENV.fetch("REDIS_URL", "redis://localhost:6379/0")
}.freeze

Sidekiq.configure_server do |config|
  config.redis = REDIS_CONFIGURATION
end

Sidekiq.configure_client do |config|
  config.redis = REDIS_CONFIGURATION
end
