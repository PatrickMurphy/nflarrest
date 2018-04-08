#!/usr/bin/python
import urllib2
r = urllib2.urlopen("http://nflarrest.com/api/v1/team?graph=true&start_date=2000-01-01&end_date=2015-10-20&cache=false").read()
with open('cache.json', 'w') as file_:
    file_.write(r)
