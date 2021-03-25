import boto3
from datetime import datetime

client = boto3.client('logs')

GROUP_NAME = 'cdklambdacloudwatch'

response = client.describe_log_streams(logGroupName=GROUP_NAME)

if not len(response['logStreams']):
    response = client.create_log_stream(
        logGroupName=GROUP_NAME,
        logStreamName='teststream'
    )

response = client.describe_log_streams(logGroupName=GROUP_NAME)

stream_name = response['logStreams'][0]['logStreamName']

sequenceToken = None

if 'uploadSequenceToken' in response['logStreams'][0]:
    sequenceToken = response['logStreams'][0]['uploadSequenceToken']

timestamp = int(datetime.now().timestamp() * 1000)

args = {
    'logGroupName': GROUP_NAME,
    'logStreamName': stream_name,
    'logEvents': [
        {
            'timestamp': timestamp,
            'message': 'ERROR {}'.format(datetime.now().isoformat()),
        },
    ]
}

if sequenceToken:
    args.update({
        'sequenceToken': sequenceToken
    })

response = client.put_log_events(**args)
