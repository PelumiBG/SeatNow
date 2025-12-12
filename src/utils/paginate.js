export const paginate = async(model, query={}, optiions={}) => {
  try{
    let page = parseInt(optiions.page) || 1;
    let limit = parseInt(optiions.limit) || 6;
    let sort = optiions.srt || "-createdAt";

    let order = [];

    if(sort.startsWith("-")){
      order.push([sort.substring(1), "DESC"]);
    }else{
      order.push([sort, "ASC"]);
    };

    let offset = (page - 1) * limit;

    const {rows: data, count: total } = await model.findAndCountAll({
      where: query,
      page,
      offset,
      order
    });

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil( total / limit),
      data
    }
  }catch(err){
    console.error("Pagination error: ", err.message);
    throw new Error("Can't get Pagination Logic")
  }
}