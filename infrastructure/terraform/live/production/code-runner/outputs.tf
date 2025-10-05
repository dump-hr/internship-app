output "web_ips" {
  value = module.code_runner.instance_ips
}

output "web_endpoint" {
  value = module.code_runner.website_endpoint
}
