package kr.co.koscom.oppf.cmm.IntegratedAccount.service;

public class MsgResponseBodyVO {
	private MsgCommonQueryTypeVO queryType = new MsgCommonQueryTypeVO();
	private MsgCommonQueryResultVO queryResult = new MsgCommonQueryResultVO();
	
	public MsgCommonQueryTypeVO getQueryType() {
		return queryType;
	}
	public void setQueryType(MsgCommonQueryTypeVO queryType) {
		this.queryType = queryType;
	}
	public MsgCommonQueryResultVO getQueryResult() {
		return queryResult;
	}
	public void setQueryResult(MsgCommonQueryResultVO queryResult) {
		this.queryResult = queryResult;
	}
}
