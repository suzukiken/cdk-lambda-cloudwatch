import base64
import gzip

def lambda_handler(event, context):

    print(event)
    
    data = event['awslogs']['data'] 
    decoded = base64.b64decode(data)
    decompressed = gzip.decompress(decoded)
    
    print(decompressed.decode('utf8'))