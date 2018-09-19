package kr.co.koscom.oppf.cmm.service.impl;

import kr.co.koscom.oppf.cmm.service.CmmFileVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

/**
* @Project  : 코스콤 오픈플렛폼
* @FileName : CmmFileDAO.java
* @Comment  : file 공통기능을 제공하는 DAO
* @author   : 신동진
* @since    : 2016.06.02
* @version  : 1.0
* @see
*
* << 개정이력(Modification Information) >>
* 수정일                수정자        수정내용
* ----------- ------  ----------
* 2016.06.02  신동진        최초생성
*
*/
@Repository("CmmFileDAO")
public class CmmFileDAO extends ComAbstractDAO{
    
    /**
     * @Method Name        : selectAppImg
     * @Method description : app Img를 가져온다.
     * @param              : CmmFileVO
     * @return             : CmmFileVO
     * @throws             : Exception
     */
    public CmmFileVO selectAppImg(CmmFileVO cmmFileVO) throws Exception{
    	return (CmmFileVO) select("cmm.CmmFileDAO.selectAppImg", cmmFileVO);
    }
    
    /**
     * @Method Name        : selectCompanyCi
     * @Method description : company ci Img를 가져온다.
     * @param              : CmmFileVO
     * @return             : CmmFileVO
     * @throws             : Exception
     */
    public CmmFileVO selectCompanyCi(CmmFileVO cmmFileVO) throws Exception{
    	return (CmmFileVO) select("cmm.CmmFileDAO.selectCompanyCi", cmmFileVO);
    }
    
    /**
     * @Method Name        : selectNotiFileDown
     * @Method description : 공지사항 첨부파일을 가져온다.
     * @param              : CmmFileVO
     * @return             : CmmFileVO
     * @throws             : Exception
     */
    public CmmFileVO selectNotiFileDown(CmmFileVO cmmFileVO) throws Exception{
    	return (CmmFileVO) select("cmm.CmmFileDAO.selectNotiFileDown", cmmFileVO);
    }
}
