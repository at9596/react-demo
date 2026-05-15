namespace :api do
  namespace :v1 do
    get "dashboard/metrics", to: "dashboard#metrics"
    get "metrics/history", to: "metrics#history"
  end
end