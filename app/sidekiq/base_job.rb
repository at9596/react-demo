class BaseJob
  include Sidekiq::Job

  sidekiq_options lock: :until_executed

  def perform(*args)
    execute(*args)
  end

  private

  def execute(*args)
    raise NotImplementedError, "#{self.class} must implement #execute"
  end
end
