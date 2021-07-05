+++
title = "CloudWatch Logsの「ERROR」でLambdaをトリガーする"
date = "2021-03-25"
tags = ["CloudWatch", "Lambda"]
+++

Lambda関数を作る時、エラーが起きたことはCloudWatch Logsに突っ込んでおくだけにしておけば楽だ。

CloudWatch Logの方ではログの中に「ERROR」だとか「WARN」だとかのキーワードが入っていたら、別のLambdaをトリガーするようにしておいて、そいつがSNSに通知するとかすれば良い。

[Githubのリポジトリ](https://github.com/suzukiken/cdklambda-cloudwatch)

このリポジトリのLambdaは何もしていないけど例えば[SNSに通知するとSlackに通知される仕組み](/aws/cdksns-slack-mail)と組み合わせるなどしても良いのかもしれない。
