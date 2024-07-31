const validateData = (data) => {
  const errors = [];
  const emails = new Set();
  const validRoles = new Set(["user", "admin"]);

  data.forEach((row, index) => {
    if (!row.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
      errors.push(`Invalid email: ${row.email}`);
    }
    if (emails.has(row.email)) {
      errors.push(`Duplicate email: ${row.email}`);
    } else {
      emails.add(row.email);
    }
    if (!validRoles.has(row.role)) {
      errors.push(`Invalid role: ${row.role}`);
    }
  });

  return errors;
};
