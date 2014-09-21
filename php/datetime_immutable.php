<?php

date_default_timezone_set('UTC');

$d1 = new DateTimeImmutable();
$d2 = $d1->setDate(2010, 10, 10);
$d3 = $d1->modify('+1 month');

print_r($d1);
print_r($d2);
print_r($d3);

?>

Output:

DateTimeImmutable Object
(
    [date] => 2014-07-04 15:45:59.000000
    [timezone_type] => 3
    [timezone] => UTC
)
DateTimeImmutable Object
(
    [date] => 2010-10-10 15:45:59.000000
    [timezone_type] => 3
    [timezone] => UTC
)
DateTimeImmutable Object
(
    [date] => 2014-08-04 15:45:59.000000
    [timezone_type] => 3
    [timezone] => UTC
)
