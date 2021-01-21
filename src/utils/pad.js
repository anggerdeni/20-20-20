const pad = function (n, size, z = "0") {
  while (n.length < size) n = z + n;
  return n;
};

export default pad;
