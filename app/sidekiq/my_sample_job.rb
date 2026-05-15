class MySampleJob < BaseJob
  private

  def execute(*args)
    Rails.logger.info("Welcome to my site, #{name}!")
  end
end
