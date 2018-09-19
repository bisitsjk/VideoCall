package kr.co.koscom.oppf.cmm.IntegratedAccount.service;

public class MsgBalanceEquityListVO {
	private String assetType;
	private String isinCode;
	private Long qty;
	private String tradeType;
	private Long valAtTrade;
	private Long valAtCur;
	private Long proLoss;
	private Double earningRate;
	
	public String getAssetType() {
		return assetType;
	}
	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}
	public String getIsinCode() {
		return isinCode;
	}
	public void setIsinCode(String isinCode) {
		this.isinCode = isinCode;
	}
	public Long getQty() {
		return qty;
	}
	public void setQty(Long qty) {
		this.qty = qty;
	}
	public Long getValAtTrade() {
		return valAtTrade;
	}
	public void setValAtTrade(Long valAtTrade) {
		this.valAtTrade = valAtTrade;
	}
	public Long getValAtCur() {
		return valAtCur;
	}
	public void setValAtCur(Long valAtCur) {
		this.valAtCur = valAtCur;
	}
	public Long getProLoss() {
		return proLoss;
	}
	public void setProLoss(Long proLoss) {
		this.proLoss = proLoss;
	}
	public Double getEarningRate() {
		return earningRate;
	}
	public void setEarningRate(Double earningRate) {
		this.earningRate = earningRate;
	}
	public String getTradeType() {
		return tradeType;
	}
	public void setTradeType(String tradeType) {
		this.tradeType = tradeType;
	}
}
