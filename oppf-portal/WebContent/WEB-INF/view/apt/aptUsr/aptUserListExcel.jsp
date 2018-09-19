<%@ page contentType="text/html; charset=utf-8" pageEncoding="UTF-8" %>
<%@ page import="kr.co.koscom.oppf.cmm.util.OppfStringUtil" %>
<%@ include file="/WEB-INF/view/cmm/common-include-doctype.jspf" %>
<!doctype html>
<html lang="ko">
<head>
<%--
/**  
 * @Name : aptUserListExcel.jsp
 * @Description : admin 포털 회원관리 excel 목록
 * @Modification Information
 *
 * <pre>
 *  Modification Information
 *  수정일                수정자        수정내용
 *  ----------  ------  ----------
 *  2016.06.16  신동진        최초  생성
 * </pre>
 *
 * @author 신동진
 * @since 2016.06.16
 * @version 1.0
 *
 */
--%>
<%  
    String date = OppfStringUtil.getTimeStamp().substring(0, 8);
    String filename = java.net.URLEncoder.encode("admin회원_"+date+".xls","UTF-8"); 
    //다운로드하고자 한다면 
    request.setCharacterEncoding("utf-8");
    response.setCharacterEncoding("utf-8");
    response.setHeader("Content-Disposition", "attachment;filename="+filename+";");
    response.setHeader("Content-Description", "JSP Generated Data");   
    response.setHeader("Pragma", "no-cache");
    response.setHeader("Cache-Control", "no-cache");
%>
</head>

<body>
<div class="tb_list1">
   <table border="1">
       <colgroup>
           <col style="width:300px;">
           <col style="width:300px;">
           <col style="width:150px;">
           <col style="width:200px;">
           <col style="width:200px;">
           <col style="width:300px;">
           <col style="width:100px;">
           <col style="width:200px;">
           <col style="width:200px;">
           <col style="width:200px;">
       </colgroup>
       <thead>
       <tr>
           <th scope="col">이름(한글)</th>
           <th scope="col">이름(영문)</th>
           <th scope="col">ID</th>
           <th scope="col">휴대폰</th>
           <th scope="col">유선전화</th>
           <th scope="col">이메일</th>
           <th scope="col">계정상태</th>
           <th scope="col">등록일</th>
           <th scope="col">수정일</th>
           <th scope="col">삭제일</th>
       </tr>
       </thead>
       <tbody>
       <c:choose>
           <c:when test="${empty resultList}" >
               <tr>
                  <td colspan="8" align="center">조회 된 데이터가 없습니다.</td>
               </tr>
           </c:when>
           <c:otherwise>
               <c:forEach var="resultList" items="${resultList}" varStatus="status">
                   <tr>
                       <td class="txt_l" align="left"><c:out value='${resultList.adminNameKor}'/></td>
                       <td class="txt_l" align="left"><c:out value='${resultList.adminNameEng}'/></td>
                       <td class="txt_l" align="left"><c:out value='${resultList.adminId}'/></td>
                       <td class="txt_l" align="left"><c:out value='${resultList.adminPhoneNo}'/></td>
                       <td class="txt_l" align="left"><c:out value='${resultList.adminTelNo}'/></td>
                       <td class="txt_l" align="left"><c:out value='${resultList.adminEmail}'/></td>
                       <td class="txt_l" align="center"><c:out value='${resultList.deleteType}'/></td>
                       <td class="txt_l" align="center"><c:out value='${resultList.createDate}'/></td>
                       <td class="txt_l" align="center"><c:out value='${resultList.updateDate}'/></td>
                       <td class="txt_l" align="center"><c:out value='${resultList.deleteDate}'/></td>
                   </tr>                                                    
               </c:forEach>
           </c:otherwise>
       </c:choose>
       </tbody>
    </table>
</div>
</body>
</html>
