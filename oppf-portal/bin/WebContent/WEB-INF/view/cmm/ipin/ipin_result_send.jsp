<%@ page contentType="text/html;charset=euc-kr" %>
<%-- <%@ page contentType="text/html; charset=utf-8"%> --%>
<%-- <%@ include file="/WEB-INF/view/cmm/common-include-doctype.jspf" %> --%>
<%-- <%@ include file="/WEB-INF/view/cmm/common-include-head.jspf" %> --%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>NICE������ �����ֹι�ȣ ����</title>
    <script language='javascript'>
        
        function fnLoad()
        {
            /* var customerVerify = "<c:out value='${resultVO.customerVerify}'/>";
            var customerNameKor = "<c:out value='${resultVO.customerNameKor}'/>";
            window.opener.document.vnoform.target = "Parent_window";
            alert("customerVerify : "+customerVerify+", customerNameKor: "+customerNameKor); */
            try{
                window.opener.fn_certHpResult("<c:out value='${resultVO.customerVerify}'/>","","<c:out value='${resultVO.customerNameKor}'/>");
            }catch(e){
                alert("�̹� �θ�â�� �����̽��ϴ�.\n�ٽ� ������ ���ֽñ� �ٶ��ϴ�.");             
            }

            self.close();
        }
        
    </script>
</head>
<body onLoad="fnLoad()">
<%-- <form name="form_result_ipin" method="post">    
    <input type="hidden" id="customerVerify" name="customerVerify" value="<c:out value='${resultVO.customerVerify}'/>">
    <input type="hidden" id="customerNameKor" name="customerNameKor" value="<c:out value='${resultVO.customerNameKor}'/>">    
</form> --%>
</body>
</html>