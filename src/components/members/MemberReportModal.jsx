'use client';

import { useRef } from "react";
import Print from "../svg/Print";

const MemberReportModal = ({ member, onClose }) => {
    const iframeRef = useRef(null);
    console.log(member)
    const handlePrint = () => {
        const printContent = iframeRef.current.contentDocument;
        printContent.body.innerHTML = document.getElementById("printable-content").innerHTML;
        iframeRef.current.contentWindow.print();
    };

    return (
        <div
            className="text-black"
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                    padding: "20px",
                    maxWidth: "800px",
                    width: "100%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    position: "relative",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
            >
                <div className="flex justify-between items-center">
                    <h2
                        style={{
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: "16px",
                            textAlign: "center",
                        }}
                    >
                        {member.name} -{" "}
                        {member.type === "permanent" ? "স্থায়ী সদস্য" : "অস্থায়ী সদস্য"}
                    </h2>
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrint}
                            className="p-2"
                        >
                            <Print />
                        </button>
                        <button
                            className="p-2"
                            onClick={onClose}
                        >
                            &#10006;
                        </button>
                    </div>
                </div>

                <div id="printable-content">
                    <h3
                        style={{
                            fontSize: "18px",
                            fontWeight: "500",
                            color: "#444",
                            marginBottom: "12px",
                            borderBottom: "1px solid #ddd",
                            paddingBottom: "8px",
                        }}
                    >
                        ব্যক্তিগত তথ্য
                    </h3>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "12px",
                            color: "#555",
                            marginBottom: "16px",
                        }}
                    >
                        <p><strong>পিতাঃ</strong> {member.father}</p>
                        <p><strong>মাতাঃ</strong> {member.mother}</p>
                        <p><strong>গ্রামঃ</strong> {member.village}</p>
                        <p><strong>মোবাইলঃ</strong> {member.mobileNumber}</p>
                        <p><strong>ইমেইলঃ</strong> {member.email}</p>
                        <p><strong>জাতীয় পরিচয়পত্রঃ</strong> {member.nationalId}</p>
                    </div>

                    <h3
                        style={{
                            fontSize: "18px",
                            fontWeight: "500",
                            color: "#444",
                            marginBottom: "12px",
                            borderBottom: "1px solid #ddd",
                            paddingBottom: "8px",
                        }}
                    >
                        সারসংক্ষেপ
                    </h3>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "12px",
                            color: "#555",
                        }}
                    >
                        <p><strong>মোট ব্যবসায় বিনিয়োগঃ</strong> {member.projectCount}</p>
                        <p><strong>বিনিয়োগের পরিমাণঃ</strong> ৳{member.totalAmountInvested.toLocaleString()}</p>
                        <p><strong>মোট লাভঃ</strong> ৳{member.totalWillGetAmount.toLocaleString()}</p>
                    </div>

                    {member.projectsInfo.length > 0 && (
                        <>
                            <h3
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "500",
                                    color: "#444",
                                    marginTop: "24px",
                                    marginBottom: "12px",
                                    borderBottom: "1px solid #ddd",
                                    paddingBottom: "8px",
                                }}
                            >
                                প্রকল্পের বিবরণ
                            </h3>
                            {member.projectsInfo.map((project) => (
                                <div
                                    key={project._id}
                                    style={{
                                        backgroundColor: "#f9f9f9",
                                        borderRadius: "6px",
                                        padding: "16px",
                                        marginBottom: "16px",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    <h4
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            color: "#333",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {project.projectName}
                                    </h4>
                                    <p style={{ fontSize: "14px" }}>
                                        <strong>প্রকল্পের ধরনঃ</strong>{" "}
                                        {project.projectType === "mudaraba" ? "মুদারাবা" : "বাইয়ে মুয়াজ্জাল"}
                                    </p>
                                    <p style={{ fontSize: "14px" }}>
                                        <strong>মোট পরিমাণঃ</strong> ৳{project.totalAmount.toLocaleString()}
                                    </p>
                                    <p style={{ fontSize: "14px" }}>
                                        <strong>মেয়াদ উত্তীর্ণঃ</strong>{" "}
                                        {new Date(project.expiryDate).toLocaleDateString()}
                                    </p>
                                    <h5
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            marginTop: "12px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        সদস্যের অবদান
                                    </h5>
                                    {project.members.length > 0 && (
                                        <>
                                            {/* Matched Member */}
                                            {project.members
                                                .filter((projMember) => projMember.name === member.name)
                                                .map((matchedMember) => (
                                                    <div
                                                        key={matchedMember.memberId}
                                                        style={{
                                                            fontSize: "14px",
                                                            paddingLeft: "16px",
                                                            marginBottom: "8px",
                                                            color: "#555",
                                                        }}
                                                    >
                                                        <p>
                                                            <strong>নাম:</strong>{" "}
                                                            <span
                                                                style={{
                                                                    fontWeight: "600",
                                                                    color: "#000000",
                                                                }}
                                                            >
                                                                {matchedMember.name}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <strong>ইনভেস্ট করেছেন:</strong> ৳
                                                            {matchedMember.amountInvested.toLocaleString()}
                                                        </p>
                                                        <p>
                                                            <strong>লাভ:</strong> ৳
                                                            {matchedMember.willGetAmount.toLocaleString()} (
                                                            {matchedMember.willGetPercentage}%)
                                                        </p>
                                                    </div>
                                                ))}

                                            {/* Other Members */}
                                            {project.members.some((projMember) => projMember.name !== member.name) && (
                                                <div
                                                    style={{
                                                        marginTop: "16px",
                                                        paddingTop: "12px",
                                                        borderTop: "1px solid #ddd",
                                                    }}
                                                >
                                                    <h5
                                                        style={{
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            marginBottom: "8px",
                                                            color: "#444",
                                                        }}
                                                    >
                                                        প্রকল্পের অন্যান্য সদস্যঃ
                                                    </h5>
                                                    {project?.members
                                                        ?.filter((projMember) => projMember.name !== member.name)
                                                        ?.map((otherMember) => (
                                                            <div
                                                                key={otherMember.memberId}
                                                                style={{
                                                                    fontSize: "14px",
                                                                    paddingLeft: "16px",
                                                                    marginBottom: "8px",
                                                                    color: "#555",
                                                                }}
                                                            >
                                                                <p>
                                                                    <strong>নাম:</strong>{" "}
                                                                    <span
                                                                        style={{
                                                                            fontWeight: "500",
                                                                            color: "#555",
                                                                        }}
                                                                    >
                                                                        {otherMember.name}
                                                                    </span>
                                                                </p>
                                                                <p>
                                                                    <strong>ইনভেস্ট করেছেন:</strong> ৳
                                                                    {otherMember.amountInvested.toLocaleString()}
                                                                </p>
                                                                <p>
                                                                    <strong>লাভ:</strong> ৳
                                                                    {otherMember.willGetAmount.toLocaleString()} (
                                                                    {otherMember.willGetPercentage}%)
                                                                </p>
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </>
                                    )}

                                </div>
                            ))}
                        </>
                    )}
                    {member.depositsInfo && member.depositsInfo.length > 0 && (
                        <>
                            <h3
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "500",
                                    color: "#444",
                                    marginTop: "24px",
                                    marginBottom: "12px",
                                    borderBottom: "1px solid #ddd",
                                    paddingBottom: "8px",
                                }}
                            >
                                আমানতের বিবরণ
                            </h3>
                            <div
                                style={{
                                    display: "grid",
                                    gap: "12px",
                                    marginBottom: "16px",
                                }}
                            >
                                {member.depositsInfo.map((deposit) => (
                                    <div
                                        key={deposit._id}
                                        style={{
                                            backgroundColor: "#f9f9f9",
                                            borderRadius: "6px",
                                            padding: "12px",
                                            border: "1px solid #ddd",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "8px",
                                        }}
                                    >
                                        <p style={{ fontSize: "14px", color: "#555" }}>
                                            <strong>পরিমাণঃ</strong> ৳{deposit.amount.toLocaleString()}
                                        </p>
                                        <p style={{ fontSize: "14px", color: "#555" }}>
                                            <strong>জমার তারিখঃ</strong>{" "}
                                            {new Date(deposit.depositDate).toLocaleDateString()}
                                        </p>
                                        {/* <p style={{ fontSize: "14px", color: "#555" }}>
                        <strong>সদস্যঃ</strong> {deposit.member.name}
                    </p> */}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "20px",
                        gap: "10px",
                    }}
                >
                    <button
                        onClick={handlePrint}
                        style={{
                            padding: "10px 16px",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "500",
                        }}
                    >
                        প্রিন্ট করুন
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            padding: "10px 16px",
                            backgroundColor: "#6c757d",
                            color: "#fff",
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "500",
                        }}
                    >
                        বাতিল করুন
                    </button>
                </div>

                {/* Hidden iframe for printing */}
                <iframe ref={iframeRef} style={{ display: "none" }} />
            </div>
        </div>
    );
};

export default MemberReportModal;
