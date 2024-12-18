
import hostname from "@/constants/hostname.mjs";
const getProjects =async (page,limit,sort,keyword) => {
    const host = await hostname();
    const res = await fetch(`${host}/api/gets/projects?page=${page}&&limit=${limit}&&sort=${sort}&&keyword=${keyword}`,{
        credentials: 'include'
    });
    const data = await res.json();
    return data;
};

export default getProjects;