-- local link_id = redis.call("INCR", KEYS[1])
-- redis.call("HSET", KEYS[2], link_id, ARGV[1])
-- return link_id
-- local msg = "Hello, world! " .. KEYS[1]
-- print(table.concat(matched_keys, ','))


function table.val_to_str ( v )
  if "string" == type( v ) then
    v = string.gsub( v, "\n", "\\n" )
    if string.match( string.gsub(v,"[^'\"]",""), '^"+$' ) then
      return "'" .. v .. "'"
    end
    return '"' .. string.gsub(v,'"', '\\"' ) .. '"'
  else
    return "table" == type( v ) and table.tostring( v ) or
      tostring( v )
  end
end

function table.key_to_str ( k )
  if "string" == type( k ) and string.match( k, "^[_%a][_%a%d]*$" ) then
    return k
  else
    return "[" .. table.val_to_str( k ) .. "]"
  end
end

function table.tostring( tbl )
  local result, done = {}, {}
  for k, v in ipairs( tbl ) do
    table.insert( result, table.val_to_str( v ) )
    done[ k ] = true
  end
  for k, v in pairs( tbl ) do
    if not done[ k ] then
      table.insert( result,
        table.key_to_str( k ) .. "=" .. table.val_to_str( v ) )
    end
  end
  return "{" .. table.concat( result, "," ) .. "}"
end

function table.from_multibulk(flat)
  local hash = {}
  for i = 1, #flat / 2 do
    hash[flat[i*2-1]] = hash[flat[i*2]]
  end
  return hash
end

  -- for key, val in ipairs(data_type) do
  --   table.insert(rows, {"data_type kv", key, val})
  -- end
  -- table.insert(rows, {"data_type", data_type.ok, type(data_type.ok), table.concat(data_type, "")})

  -- table.insert(rows, {"data_type[1]", data_type[1], type(data_type[1])})
  -- end

