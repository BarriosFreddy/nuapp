db.items.createIndex({ code: 1, name: 1 }, { name: "code_name_idx", unique: true });
db.items.createIndex({ createdAt: -1 }, { name: "created_at_idx" });