# -*- coding:utf-8 -*-
'''
    @author xinjiankang@baidu.com
    python runner for case daily run
'''
import os, sys, subprocess, time
from os.path import getsize
from urllib import urlopen

#config contact here
contacts = '18612081037'


def shell(c):
    sub2 = subprocess.Popen(c,stdout=subprocess.PIPE,stderr=subprocess.PIPE,shell=True)
    return sub2

def caseRunCheck(p):
    el = []
    apc = []
    while 1:
        ret1 = subprocess.Popen.poll(p)
        tmp = p.stdout.readline()
        if tmp !=None and tmp != '' :
            print tmp.rstrip()
            if tmp.find('APKPARSE') != -1:
                apc.append(tmp)
            elif tmp.find('FAIL')  != -1:
                el.append(tmp)
        if ret1 == 0 :
            break
        if ret1 is None:
            time.sleep(0.2)
        else :
            break
    return el,apc

if len(sys.argv) <=0 :
    print 'no test case given'

smsserver = 'http://appstest.baidu.com:8090/zaxon/smshelper_for_91/smshelper.php?'

casepath = '/home/zaxon/baidu91/mcasperjs/case/91assistant'

for case in sys.argv:
    if case.find('pyrunner') == -1:
        case = casepath+'/'+case
        cmd = '/usr/local/bin/casperjs %s'%(case+'.js')
        sub = shell(cmd)
        errors,apkPcmd = caseRunCheck(sub)
        if len(errors) > 0 :
            errorreport = '91Asisstant Online Monitor \n Case : %s \n' % (case)
            for error in errors :
                errorreport = errorreport + error + '\n'
            url = smsserver + 'ct=' + contacts
            url = url + '&msg=' + '\'%s\''%(errorreport)
            urlopen(url)

        #for apk parse only
        if len(apkPcmd) > 0 :
            for c in apkPcmd:
                cmd = c.split(' ')
                if str(getsize(cmd[1])) != cmd[2]:
                    print '\033[32;41mFAIL\033[0m  apk大小校验失败'
                    url = smsserver + 'ct=' + contacts
                    errorreport = '91Asisstant Online Monitor \n Case : %s \n' % (case)
                    url = url + '&msg=' + errorreport+'\'线上APK下载错误(apk可能安装失败)--分类:%s，APK名:%s，下载URL：%s\''%(cmd[3],cmd[4],cmd[5])
                    urlopen(url)
                else :
                    url = smsserver + 'ct=' + contacts
                    errorreport = '91Asisstant Online Monitor \n Case : %s \n' % (case)
                    url = url + '&msg=' + '\'91 download check OK\''
                    urlopen(url)
                    print '\033[32;1mPASS\033[0m  apk大小校验OK'

