package kr.co.koscom.oppf.cmm.IntegratedAccount.service;

public class CommonFailViewVO {
	private String comId;
	private String comName;
	private String vtAccNo;
	private String vtAccAlias;
	private String detailMessage;

	public CommonFailViewVO(String comId, String vtAccNo, String vtAccAlias, String detailMessage) {
		this.comId = comId;
		this.vtAccNo = vtAccNo;
		this.vtAccAlias = vtAccAlias;
		this.detailMessage = detailMessage;
	}

	public String getComId() {
		return comId;
	}
	public void setComId(String comId) {
		this.comId = comId;
	}
	public String getVtAccNo() {
		return vtAccNo;
	}
	public void setVtAccNo(String vtAccNo) {
		this.vtAccNo = vtAccNo;
	}
	public String getVtAccAlias() {
		return vtAccAlias;
	}
	public void setVtAccAlias(String vtAccAlias) {
		this.vtAccAlias = vtAccAlias;
	}
	public String getDetailMessage() {
		return detailMessage;
	}
	public void setDetailMessage(String detailMessage) {
		this.detailMessage = detailMessage;
	}
	public String getComName() {
		return comName;
	}
	public void setComName(String comName) {
		this.comName = comName;
	}
}
