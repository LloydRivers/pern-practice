
UPDATE products SET 
name = $1, 
price = $2, 
description = $3, 
category = $4,
image = $5,
rating= $6
WHERE productid = $7;

