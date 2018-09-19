<%@ page contentType="text/html;charset=euc-kr" %>
<%-- <%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%> --%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt"       uri="http://java.sun.com/jsp/jstl/fmt"  %>
<%-- <%@ taglib prefix="ui"        uri="http://egovframework.gov/ctl/ui"%> --%>
<%@ taglib prefix="fn"        uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%

    /********************************************************************************************************************************************
        NICE������ Copyright(c) KOREA INFOMATION SERVICE INC. ALL RIGHTS RESERVED
        
        ���񽺸� : �����ֹι�ȣ���� (IPIN) ����
        �������� : �����ֹι�ȣ���� (IPIN) ����� ���� ���� ó�� ������
        
                   ���Ź��� ������(�������)�� ����ȭ������ �ǵ����ְ�, close�� �ϴ� ��Ȱ�� �մϴ�.
    *********************************************************************************************************************************************/
    
    // ����� ���� �� CP ��û��ȣ�� ��ȣȭ�� ����Ÿ�Դϴ�. (ipin_main.jsp ���������� ��ȣȭ�� ����Ÿ�ʹ� �ٸ��ϴ�.)
    String sResponseData = requestReplace(request.getParameter("enc_data"), "encodeData");
    
    // ipin_main.jsp ���������� ������ ����Ÿ�� �ִٸ�, �Ʒ��� ���� Ȯ�ΰ����մϴ�.
    String sReservedParam1  = requestReplace(request.getParameter("param_r1"), "");
    String sReservedParam2  = requestReplace(request.getParameter("param_r2"), "");
    String sReservedParam3  = requestReplace(request.getParameter("param_r3"), "");
     
    // ��ȣȭ�� ����� ������ �����ϴ� ���
    if (!sResponseData.equals("") && sResponseData != null)
    {

%>

<html>
<head>
<%--JQUERY �⺻ ��ũ��Ʈ--%>
<script type="text/javascript" src="<c:url value='/js/cmm/jquery-1.11.3.min.js'/>"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="<c:url value='/js/cmm/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/cmm/html5shiv.min.js'/>"></script>

<%-- ���� ��ũ��Ʈ --%>
<script type="text/javascript" src="<c:url value='/js/cmm/common.js'/>"></script>   <%-- ���� ��ũ��Ʈ --%>
<script type="text/javascript" src="<c:url value='/js/cmm/commonUI.js'/>"></script> <%-- �����˾� ��ũ��Ʈ --%>
<script type="text/javascript" src="<c:url value='/js/cmm/string.js'/>"></script>   <%-- string prototype --%>
<script type="text/javascript" src="<c:url value='/js/cmm/paging.js'/>"></script>
<%-- ���� ��ũ��Ʈ --%>

<script type="text/javascript" src="<c:url value='/js/cmm/util.js'/>"></script>

    <title>NICE������ �����ֹι�ȣ ����</title>
    <script language='javascript'>
        function fnLoad()
        {
            // ��翡���� �ֻ����� �����ϱ� ���� 'parent.opener.parent.document.'�� �����Ͽ����ϴ�.
            // ���� �ͻ翡 ���μ����� �°� �����Ͻñ� �ٶ��ϴ�.
            <%-- parent.opener.parent.document.vnoform.enc_data.value = "<%= sResponseData %>";         
            parent.opener.parent.document.vnoform.param_r1.value = "<%= sReservedParam1 %>";
            parent.opener.parent.document.vnoform.param_r2.value = "<%= sReservedParam2 %>";
            parent.opener.parent.document.vnoform.param_r3.value = "<%= sReservedParam3 %>"; --%>
            
            //parent.opener.parent.document.vnoform.target = "Parent_window";
            
            // ���� �Ϸ�ÿ� ��������� �����ϰ� �Ǵ� �ͻ� Ŭ���̾�Ʈ ��� ������ URL
            /* parent.opener.parent.document.vnoform.action = "ipin_result.jsp"; */
            /* parent.opener.parent.document.vnoform.action = "http://localhost:8080/cmm/ipin/ipinResult.do";
            parent.opener.parent.document.vnoform.submit(); */
            
            try{
                var url = "";
                url = window.opener.document.form_ipin.param_r3.value+"/cmm/ipin/ipinResult.do";
                var objParam = new Object();
                objParam.enc_data = String("<%= sResponseData %>");
                objParam.param_r1 = String("<%= sReservedParam1 %>");
                objParam.param_r2 = String("<%= sReservedParam2 %>");
                objParam.param_r3 = String("<%= sReservedParam3 %>");           
                util_movePage(url,objParam);
            }catch(e){
                alert("�̹� �θ�â�� �����̽��ϴ�.\n�ٽ� ������ ���ֽñ� �ٶ��ϴ�.");
                self.close();
            }
            
            //self.close();
        }
    </script>
</head>
<body onLoad="fnLoad()">

<%
    } else {
%>

<html>
<head>
    <title>NICE������ �����ֹι�ȣ ����</title>
    <body onLoad="self.close()">

<%
    }
%>
<%!
public String requestReplace (String paramValue, String gubun) {
        String result = "";
        
        if (paramValue != null) {
            
            paramValue = paramValue.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

            paramValue = paramValue.replaceAll("\\*", "");
            paramValue = paramValue.replaceAll("\\?", "");
            paramValue = paramValue.replaceAll("\\[", "");
            paramValue = paramValue.replaceAll("\\{", "");
            paramValue = paramValue.replaceAll("\\(", "");
            paramValue = paramValue.replaceAll("\\)", "");
            paramValue = paramValue.replaceAll("\\^", "");
            paramValue = paramValue.replaceAll("\\$", "");
            paramValue = paramValue.replaceAll("'", "");
            paramValue = paramValue.replaceAll("@", "");
            paramValue = paramValue.replaceAll("%", "");
            paramValue = paramValue.replaceAll(";", "");
            paramValue = paramValue.replaceAll(":", "");
            paramValue = paramValue.replaceAll("-", "");
            paramValue = paramValue.replaceAll("#", "");
            paramValue = paramValue.replaceAll("--", "");
            paramValue = paramValue.replaceAll("-", "");
            paramValue = paramValue.replaceAll(",", "");
            
            if(gubun != "encodeData"){
                paramValue = paramValue.replaceAll("\\+", "");
                paramValue = paramValue.replaceAll("/", "");
            paramValue = paramValue.replaceAll("=", "");
            }
            
            result = paramValue;
            
        }
        return result;
  }
%>

</body>
</html>