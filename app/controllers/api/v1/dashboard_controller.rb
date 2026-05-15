class Api::V1::DashboardController < ApplicationController
  def metrics
    render json: ::MetricsService.call
  end
end
