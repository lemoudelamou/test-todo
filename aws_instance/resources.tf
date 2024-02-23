
resource "aws_key_pair" "ssh" {
  key_name   = "operator" 
  public_key = file("./.ssh/operator.pub")
}

resource "aws_instance" "vm" {
  ami = data.aws_ami.image.id
  instance_type = "t2.micro"                

  key_name      = aws_key_pair.ssh.key_name

  vpc_security_group_ids = [aws_security_group.allow-ssh.id]
  associate_public_ip_address = true
tags = {
    Name = "My-Project-EC2-Instance"
  }
}

#Create an Elastic IP
resource "aws_eip" "demo-eip" {
  domain = "vpc"
}


#Associate EIP with EC2 Instance
resource "aws_eip_association" "demo-eip-association" {
  instance_id   = aws_instance.vm.id
  allocation_id = aws_eip.demo-eip.id
}

output "elastic_ip" {
  value = aws_eip.demo-eip.public_ip
}


resource "aws_security_group" "allow-ssh" {
  name        = "security-group"
  description = "security group for SSH and HTTP access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

 ingress {
    from_port   = 3500
    to_port     = 3500
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_sns_topic" "notification" {
  name = "MyMern-stackNotification"
}

# CloudWatch alarms and notifications, CPU utilization, memory usage, disk space
resource "aws_cloudwatch_metric_alarm" "cpu_utilization_alarm" {
  alarm_name          = "HighCPUUtilization"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "70"
  alarm_description  = "This metric checks for high CPU utilization"
  alarm_actions      = ["${aws_sns_topic.notification.arn}"]

  dimensions = {
    InstanceId = aws_instance.vm.id
  }
}


