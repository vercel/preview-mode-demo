terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "zeit"

    workspaces {
      name = "nextjs-preview-demo"
    }
  }
}

provider "aws" {
  version = "~> 2.0"
  region  = "us-west-2"
}
