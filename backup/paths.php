<html>
<head>
<script type='text/javascript' src='../js/jquery1.js'></script>
<script type='text/javascript'>
</script>
</head>
<body>
<?php
$json = json_decode(file_get_contents("json/paths.json", true));
$paths = $json->paths;

$customer = $paths->customer;
$mortgage = $customer->mortgage;
$loan_app = $customer->loan_app;
$ebanking_demo = $customer->ebanking_demo;
$billpay_demo = $customer->billpay_demo;
$ebanking_enroll = $customer->ebanking_enroll;
$activate_estatements = $customer->activate_estatements;
$calc = $customer->calc;
$security = $customer->security;
print_r($mortgage->name);
echo "<br/>";
print_r($mortgage->path);
echo "<br/>";
print_r($mortgage->location);
echo "<br/>";
print_r($mortgage->win);
echo "<br/>";
echo "<br/>";
print_r($loan_app->name);
echo "<br/>";
print_r($loan_app->path);
echo "<br/>";
print_r($loan_app->location);
echo "<br/>";
print_r($loan_app->win);
echo "<br/>";
echo "<br/>";
print_r($ebanking_demo->name);
echo "<br/>";
print_r($ebanking_demo->path);
echo "<br/>";
print_r($ebanking_demo->location);
echo "<br/>";
print_r($ebanking_demo->win);
echo "<br/>";
echo "<br/>";
print_r($billpay_demo->name);
echo "<br/>";
print_r($billpay_demo->path);
echo "<br/>";
print_r($billpay_demo->location);
echo "<br/>";
print_r($billpay_demo->win);
echo "<br/>";
echo "<br/>";
print_r($ebanking_enroll->name);
echo "<br/>";
print_r($ebanking_enroll->path);
echo "<br/>";
print_r($ebanking_enroll->location);
echo "<br/>";
print_r($ebanking_enroll->win);
echo "<br/>";
echo "<br/>";
print_r($activate_estatements->name);
echo "<br/>";
print_r($activate_estatements->path);
echo "<br/>";
print_r($activate_estatements->location);
echo "<br/>";
print_r($activate_estatements->win);
echo "<br/>";
echo "<br/>";
print_r($calc->name);
echo "<br/>";
print_r($calc->path);
echo "<br/>";
print_r($calc->location);
echo "<br/>";
print_r($calc->win);
echo "<br/>";
echo "<br/>";
print_r($security->name);
echo "<br/>";
print_r($security->path);
echo "<br/>";
print_r($security->location);
echo "<br/>";
print_r($security->win);
echo "<br/>";
echo "<br/>";


$personal = $paths->personal;
$checking = $personal->checking;
$money_market = $personal->money_market;
$savings = $personal->savings;
$cod = $personal->cod;
$ira = $personal->ira;
$card_services = $personal->card_services;
$ebanking = $personal->ebanking;
$loans = $personal->loans;
$mortgage = $personal->mortgage;
$go_club = $personal->go_club;
$services = $personal->services;
print_r($checking->name);
echo "<br/>";
print_r($checking->path);
echo "<br/>";
print_r($checking->location);
echo "<br/>";
print_r($checking->win);
echo "<br/>";
echo "<br/>";
print_r($money_market->name);
echo "<br/>";
print_r($money_market->path);
echo "<br/>";
print_r($money_market->location);
echo "<br/>";
print_r($money_market->win);
echo "<br/>";
echo "<br/>";
print_r($savings->name);
echo "<br/>";
print_r($savings->path);
echo "<br/>";
print_r($savings->location);
echo "<br/>";
print_r($savings->win);
echo "<br/>";
echo "<br/>";
print_r($cod->name);
echo "<br/>";
print_r($cod->path);
echo "<br/>";
print_r($cod->location);
echo "<br/>";
print_r($cod->win);
echo "<br/>";
echo "<br/>";
print_r($ira->name);
echo "<br/>";
print_r($ira->path);
echo "<br/>";
print_r($ira->location);
echo "<br/>";
print_r($ira->win);
echo "<br/>";
echo "<br/>";
print_r($card_services->name);
echo "<br/>";
print_r($card_services->path);
echo "<br/>";
print_r($card_services->location);
echo "<br/>";
print_r($card_services->win);
echo "<br/>";
echo "<br/>";
print_r($ebanking->name);
echo "<br/>";
print_r($ebanking->path);
echo "<br/>";
print_r($ebanking->location);
echo "<br/>";
print_r($ebanking->win);
echo "<br/>";
echo "<br/>";
print_r($ebanking->name);
echo "<br/>";
print_r($ebanking->path);
echo "<br/>";
print_r($ebanking->location);
echo "<br/>";
print_r($ebanking->win);
echo "<br/>";
echo "<br/>";
print_r($loans->name);
echo "<br/>";
print_r($loans->path);
echo "<br/>";
print_r($loans->location);
echo "<br/>";
print_r($loans->win);
echo "<br/>";
echo "<br/>";
print_r($mortgage->name);
echo "<br/>";
print_r($mortgage->path);
echo "<br/>";
print_r($mortgage->location);
echo "<br/>";
print_r($mortgage->win);
echo "<br/>";
echo "<br/>";
print_r($go_club->name);
echo "<br/>";
print_r($go_club->path);
echo "<br/>";
print_r($go_club->location);
echo "<br/>";
print_r($go_club->win);
echo "<br/>";
echo "<br/>";
print_r($services->name);
echo "<br/>";
print_r($services->path);
echo "<br/>";
print_r($services->location);
echo "<br/>";
print_r($services->win);
echo "<br/>";
echo "<br/>";


$business = $paths->business;
$business_checking = $business->checking;
$business_ebanking = $business->ebanking;
$remote_deposit = $business->remote_deposit;
$business_debit_card = $business->business_debit_card;
$business_loans = $business->loans;
$banking_services = $business->banking_services;
print_r($business_checking->name);
echo "<br/>";
print_r($business_checking->path);
echo "<br/>";
print_r($business_checking->location);
echo "<br/>";
print_r($business_checking->win);
echo "<br/>";
echo "<br/>";
print_r($business_ebanking->name);
echo "<br/>";
print_r($business_ebanking->path);
echo "<br/>";
print_r($business_ebanking->location);
echo "<br/>";
print_r($business_ebanking->win);
echo "<br/>";
echo "<br/>";
print_r($remote_deposit->name);
echo "<br/>";
print_r($remote_deposit->path);
echo "<br/>";
print_r($remote_deposit->location);
echo "<br/>";
print_r($remote_deposit->win);
echo "<br/>";
echo "<br/>";
print_r($business_debit_card->name);
echo "<br/>";
print_r($business_debit_card->path);
echo "<br/>";
print_r($business_debit_card->location);
echo "<br/>";
print_r($business_debit_card->win);
echo "<br/>";
echo "<br/>";
print_r($banking_services->name);
echo "<br/>";
print_r($banking_services->path);
echo "<br/>";
print_r($banking_services->location);
echo "<br/>";
print_r($banking_services->win);
echo "<br/>";
echo "<br/>";


$about = $paths->about;
$history = $about->history;
$mission = $about->mission;
$news = $about->news;
$employment = $about->employment;
$hours_locations = $about->hours_locations;
$atm = $about->atm;
$contact = $about->contact;
print_r($history->name);
echo "<br/>";
print_r($history->path);
echo "<br/>";
print_r($history->location);
echo "<br/>";
print_r($history->win);
echo "<br/>";
echo "<br/>";
print_r($mission->name);
echo "<br/>";
print_r($mission->path);
echo "<br/>";
print_r($mission->location);
echo "<br/>";
print_r($mission->win);
echo "<br/>";
echo "<br/>";
print_r($news->name);
echo "<br/>";
print_r($news->path);
echo "<br/>";
print_r($news->location);
echo "<br/>";
print_r($news->win);
echo "<br/>";
echo "<br/>";
print_r($employment->name);
echo "<br/>";
print_r($employment->path);
echo "<br/>";
print_r($employment->location);
echo "<br/>";
print_r($employment->win);
echo "<br/>";
echo "<br/>";
print_r($atm->name);
echo "<br/>";
print_r($atm->path);
echo "<br/>";
print_r($atm->location);
echo "<br/>";
print_r($atm->win);
echo "<br/>";
echo "<br/>";
print_r($contact->name);
echo "<br/>";
print_r($contact->path);
echo "<br/>";
print_r($contact->location);
echo "<br/>";
print_r($contact->win);
echo "<br/>";
echo "<br/>";

?>
</body>
</html>