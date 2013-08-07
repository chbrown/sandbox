local pattern = KEYS[1]
local common = pattern:gsub("^\*+", ""):gsub("\*+$", "")

local keys = redis.call("KEYS", pattern)
local rows = {}
for i, key in ipairs(keys) do
  local name = key:gsub(common, "")
  local data_type = redis.call("TYPE", key).ok

  if data_type == "string" then
    local value = redis.call("GET", key)
    table.insert(rows, string.format("%s\t%s", name, value))
  elseif data_type == "hash" then
    local flat = redis.call("HGETALL", key)
    for i = 1, #flat / 2 do
      table.insert(rows, string.format("%s.%s\t%s", name, flat[i*2-1], flat[i*2]))
    end
  else
    -- table.insert(rows, {"???", name, data_type, type(data_type)})
  end
end

return rows
