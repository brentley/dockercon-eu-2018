# dockercon-eu-2018

### Set Env:
```
export ACCOUNT_ID=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.accountId')
export AWS_REGION=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.region')
export DOCKER_LOGIN=`aws ecr get-login --no-include-email`
export PASSWORD=`echo $DOCKER_LOGIN | cut -d' ' -f6`
export REGISTRY=`echo $DOCKER_LOGIN | cut -d' ' -f7 | sed "s/https:\/\///"`
export DOCKER_USER=AWS 
export DOCKER_PASSWORD=${PASSWORD} 
export AWS_DEFAULT_REGION=$AWS_REGION
export CLAIR_ADDR=coreo-Clair-HQCJEAT3VJ0Y-963444812.eu-west-1.elb.amazonaws.com
aws configure set default.region ${AWS_REGION}  
$(aws ecr get-login --no-include-email)
aws ecr create-repository --repository-name sample-app
```

### Build Original Centos Image:
```
docker build . -f Dockerfile-centos-original -t ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:centos-original
docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:centos-original
docker images | grep sample-app | egrep '(centos-original)' 
docker run --init --rm -p 8080:8080 -ti 250756795962.dkr.ecr.eu-west-1.amazonaws.com/sample-app:centos-original
```

### Build Centos Image:
```
docker build . -f Dockerfile-centos -t ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:centos
docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:centos
docker images | grep sample-app | egrep '(centos)' 
docker run --init --rm -p 8080:8080 -ti 250756795962.dkr.ecr.eu-west-1.amazonaws.com/sample-app:centos
```

### Build Alpine Image:
```
docker build . -f Dockerfile-alpine -t ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:alpine
docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:alpine
docker images | grep sample-app | egrep '(centos|alpine)' 
docker run --init --rm -p 8080:8080 -ti 250756795962.dkr.ecr.eu-west-1.amazonaws.com/sample-app:alpine
```

### Build Distroless Image:
```
docker build . -f Dockerfile-distroless -t ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:distroless
docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:distroless
docker run --init --rm -p 8080:8080 -ti 250756795962.dkr.ecr.eu-west-1.amazonaws.com/sample-app:distroless
```

### Compare image sizes:
```
docker images | grep sample-app | egrep '(centos|alpine|distroless)' 
```

### Scan images:
```
klar ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:centos-original
klar ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:centos
klar ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:alpine
klar ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:distroless
```

### Explore images:
```
docker run -ti --entrypoint=sh ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:centos
docker run -ti --entrypoint=sh ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:alpine
docker run -ti --entrypoint=sh ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/sample-app:distroless
```

See also:

https://eksworkshop.com

https://ecsworkshop.com

https://containersonaws.com

https://github.com/optiopay/klar

https://github.com/jasonumiker/clair-ecs-fargate

https://github.com/aws-samples/aws-codepipeline-docker-vulnerability-scan

https://github.com/GoogleContainerTools/distroless
