#!/bin/bash
ssh $1 "systemctl restart tomcat.service"