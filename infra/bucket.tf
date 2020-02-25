resource "aws_s3_bucket" "next-preview-demo" {
  bucket = "next-preview-demo"
  acl    = "private"
  region = "us-west-2"
}

resource "aws_iam_user" "next-preview-user" {
  name = "next_preview_user"
}

resource "aws_iam_access_key" "next-preview-user" {
  user = aws_iam_user.next-preview-user.name
}

output "next-preview-user_id" {
  value = aws_iam_access_key.next-preview-user.id
}

output "next-preview-user_secret" {
  value = aws_iam_access_key.next-preview-user.secret
}


resource "aws_iam_user_policy" "next-preview-demo" {
  name = "next_preview_demo_s3"
  user = aws_iam_user.next-preview-user.name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": ["${aws_s3_bucket.next-preview-demo.arn}/*"]
    }
  ]
}
EOF
}
