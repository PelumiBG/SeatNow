export const paginate = async (model, query = {}, options = {}) => {
  let page = parseInt(options.page) || 1;
  let limit = parseInt(options.limit) || 10;
  let sort = options.srt || "-createdAt";


  let order = [];
  if (sort.startsWith("-")) {order.push([sort.substring(1), "DESC"]);
  } else {
    order.push([sort, "ASC"]);
  }

  const skip = (page - 1) * limit;

  const { rows: data, count: total } = await model.findAndCountAll({
    where: query,
    limit,
    skip,
    order
  });

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data,
  };
};