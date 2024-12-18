
import hostname from "@/constants/hostname.mjs";

const getMembersWithDetails =async (page,limit,sort,keyword) => {
    const host = await hostname();
    const res = await fetch(`${host}/api/gets/members-with-details?page=${page}&&limit=${limit}&&sort=${sort}&&keyword=${keyword}`,{
        credentials: 'include'
    });
    const data = await res.json();
    return data;
};

export default getMembersWithDetails;