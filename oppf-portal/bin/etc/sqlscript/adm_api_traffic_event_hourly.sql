﻿# Host: 10.10.10.100  (Version 5.7.17-ndb-7.5.5-cluster-gpl-log)
# Date: 2017-07-05 10:43:24
# Generator: MySQL-Front 5.4  (Build 4.71) - http://www.mysqlfront.de/

/*!40101 SET NAMES utf8 */;

#
# Event "adm_api_traffic_event_hourly"
#

DROP EVENT IF EXISTS `adm_api_traffic_event_hourly`;
CREATE EVENT `adm_api_traffic_event_hourly` ON SCHEDULE EVERY 1 HOUR STARTS '2016-07-12 00:05:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    /*
    * 개발기 서버별 시간이 틀려 1시간 -> 2시간 전 데이터 집계
    *
    * 매시간 5분마다 데이터 체크하여 시간단위 traffic data를 집계한다.
    */
    DECLARE v_std_date varchar(10);       /* 기준 date */
    DECLARE v_data_cnt int;               /* 현재 시간 기준 데이터 체크 수*/
    
    set v_std_date = date_format(subdate(now(), INTERVAL 1 HOUR), '%Y%m%d%H');
    
    /**
    * 현시간의 -1 시간의 데이터가 집계되어있는지 여부 체크
    */
    select count(*)
    into v_data_cnt
    from adm_api_traffic_hourly
    where std_date = v_std_date COLLATE utf8_general_ci
    ;
    
    /* 저장 데이터가 없을 경우에만 셋팅한다. */
if v_data_cnt <= 0 then     
    insert into adm_api_traffic_hourly(
        std_date,
        api_id,
        app_id,
        app_key,
        api_group,
        api_service,
        response_result_yn,
        api_method,
        api_resource,
        avg_api_duration,
        max_api_duration,
        min_api_duration,
        sum_api_duration,
        cnt_api_duration,
        avg_sif_duration,
        max_sif_duration,
        min_sif_duration,
        sum_sif_duration,
        cnt_sif_duration,
        create_date
    )
    select  v_std_date as std_date,
            ifnull(a.api_id, '') as api_id,
            ifnull(a.app_id, '') as app_id,
            ifnull(a.app_key, '') as app_key,
            ifnull(a.api_group, '') as api_group,
            ifnull(a.api_service, '') as api_service,
            ifnull(a.response_result_yn, '') as response_result_yn,
            max(a.api_method) as api_method,
            max(a.api_resource) as api_resource,
            round(sum(a.sum_api_duration) / sum(a.cnt_api_duration), 3)     as avg_api_duration,
            max(a.max_api_duration)                                         as max_api_duration, 
            min(a.min_api_duration)                                         as min_api_duration,
            sum(a.sum_api_duration)                                         as sum_api_duration,
            sum(a.cnt_api_duration)                                         as cnt_api_duration,
            round(sum(a.sum_sif_duration) / sum(a.cnt_sif_duration), 3)     as avg_sif_duration,
            max(a.max_sif_duration)                                         as max_sif_duration, 
            min(a.min_sif_duration)                                         as min_sif_duration,
            sum(a.sum_sif_duration)                                         as sum_sif_duration,
            sum(a.cnt_sif_duration)                                         as cnt_sif_duration,
            now()                                                           as create_date
    from adm_api_traffic_min a               
    where a.std_date >= concat(v_std_date ,'00') COLLATE utf8_general_ci
    and   a.std_date <= concat(v_std_date ,'99') COLLATE utf8_general_ci
    group by a.api_id, a.app_id, a.app_key, a.api_group, a.response_result_yn   
    ;            
    end if;
END;
