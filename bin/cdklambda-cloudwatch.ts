#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdklambdaCloudwatchStack } from '../lib/cdklambda-cloudwatch-stack';

const app = new cdk.App();
new CdklambdaCloudwatchStack(app, 'CdklambdaCloudwatchStack');
