import {
    serverErrorResponse,
    successResponse,
} from "@/constants/routeResponses.mjs";
import dbConnect from "@/services/dbConnect.mjs";

export const GET = async (req) => {
    try {
        const db = await dbConnect();
        const searchParams = req.nextUrl.searchParams;
        const keyword = searchParams.get("keyword");
        const sort = searchParams.get("sort");
        const page = parseInt(searchParams.get("page"));
        const limit = parseInt(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        const matchStage = {};

        if (keyword) {
            matchStage.$or = [
                { name: { $regex: keyword, $options: "i" } },
                { father: { $regex: keyword, $options: "i" } },
                { mother: { $regex: keyword, $options: "i" } },
                { district: { $regex: keyword, $options: "i" } },
                { email: { $regex: keyword, $options: "i" } },
                { mobileNumber: { $regex: keyword, $options: "i" } },
                { nationalId: { $regex: keyword, $options: "i" } },
                { village: { $regex: keyword, $options: "i" } },
                { policeStation: { $regex: keyword, $options: "i" } },
            ];
        }

        const membersCollection = db.collection("members");
        const projectsCollection = db.collection("projects");

        const members = await membersCollection.aggregate([
            { $match: matchStage },
            {
                $lookup: {
                    from: "projects",
                    localField: "_id",
                    foreignField: "members.memberId",
                    as: "projectsInfo",
                },
            },
            {
                $addFields: {
                    projectCount: { $size: "$projectsInfo" },
                    totalAmountInvested: {
                        $sum: {
                            $map: {
                                input: "$projectsInfo",
                                as: "project",
                                in: {
                                    $sum: {
                                        $map: {
                                            input: {
                                                $filter: {
                                                    input: "$$project.members",
                                                    as: "member",
                                                    cond: { $eq: ["$$member.memberId", "$_id"] },
                                                },
                                            },
                                            as: "memberDetail",
                                            in: "$$memberDetail.amountInvested",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    totalWillGetAmount: {
                        $sum: {
                            $map: {
                                input: "$projectsInfo",
                                as: "project",
                                in: {
                                    $sum: {
                                        $map: {
                                            input: {
                                                $filter: {
                                                    input: "$$project.members",
                                                    as: "member",
                                                    cond: { $eq: ["$$member.memberId", "$_id"] },
                                                },
                                            },
                                            as: "memberDetail",
                                            in: "$$memberDetail.willGetAmount",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            { $skip: skip },
            { $limit: limit },
        ]).toArray();

        const totalCount = await membersCollection.countDocuments(matchStage);

        return successResponse({ members, totalCount }, "Members Found");
    } catch (e) {
        return serverErrorResponse(e.message);
    }
};