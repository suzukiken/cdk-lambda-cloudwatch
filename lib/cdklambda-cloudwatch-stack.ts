import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { PythonFunction } from "@aws-cdk/aws-lambda-python";
import * as logs from "@aws-cdk/aws-logs";
import { LambdaDestination } from "@aws-cdk/aws-logs-destinations";

export class CdklambdaCloudwatchStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const PREFIX_NAME = id.toLocaleLowerCase().replace("stack","")

    const lambda_function = new PythonFunction(this, "lambda_function", {
      entry: "lambda",
      index: "index.py",
      handler: "lambda_handler",
      functionName: PREFIX_NAME,
      runtime: lambda.Runtime.PYTHON_3_8,
      timeout: cdk.Duration.seconds(10),
    });
    
    const log_group = new logs.LogGroup(this, 'log_group', {
      logGroupName: PREFIX_NAME
    });

    const subscription = new logs.SubscriptionFilter(this, 'subscription', {
      logGroup: log_group,
      destination: new LambdaDestination(lambda_function),
      filterPattern: logs.FilterPattern.allTerms("ERROR")
    });
  }
}
