#!/bin/bash
jenkinsProject=$1
#等待15秒,有些项目run容器可能需要更长的时间,需按需修改,否则会经常出现测试失败的结果
#curl 101.236.35.146:8705/coupon/hello |grep "welcome to"
#stats=`echo $?`
#while [ $stats == 1 ]
#do
#	curl 101.236.35.146:8705/coupon/hello |grep "welcome to"
#	stats=`echo $?`
#	if [ $stats == 0 ]; then
#		echo "启动就绪"
#		break
#	fi
#done
#cd devops/cicd/bin/cd-shell/test-shell
sleep 5s
# #api接口测试
 #pabot ApiRequest.txt
 #scp -P 51804 -r ./*.html root@119.23.238.65:/home/jenkins/workspace/${jenkinsProject}
 #scp -P 51804 -r ./*.xml root@119.23.238.65:/home/jenkins/workspace/${jenkinsProject}
 #cd ../../../../../
 