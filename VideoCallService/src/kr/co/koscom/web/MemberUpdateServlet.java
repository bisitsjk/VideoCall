package kr.co.koscom.web;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class MemberUpdateServlet
 */
@WebServlet("/memberUpdate")
public class MemberUpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MemberUpdateServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		MemberDTO member = new MemberDTO();
		member.setName(request.getParameter("name"));
		member.setPassword(request.getParameter("password"));
		member.setEmail(request.getParameter("email"));
		member.setPhonenumber(request.getParameter("phonenumber"));
		member.setAddress(request.getParameter("address"));
		
		MemberDAO dao = new MemberDAOImpl();
		dao.updateMember(member);
		
		response.sendRedirect("memberList");
	}

}
