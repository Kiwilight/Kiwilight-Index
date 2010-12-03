<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
    <title>Index for /directory/</title>
    <link href="/kiwiindex/index.css" rel="stylesheet" type="text/css" />
  </head>

  <body id="body" class="body">
    <div class="link-to-back-"><a class="link-to-back" href="../">
        <img alt="Up Arrow^" src="/kiwiindex/back.png" /></a>
      <a class="link-to-back" href="../">Parent Directory</a>
    </div><h1 class="title">Index for /directory/</h1>
    <table class="index" cellspacing="0px" cellpadding="4px">
      <tr class="head">
        <th class="icon">
          <img src="/kiwiindex/text-blank.png" alt="[ICO]" /></th>
        <th class="name">Name</th>
        <th class="size">Mode</th>
        <th class="date">Last modified</th>
      </tr>

      <?php $link = ldap_connect("ldap://ldap.kiwilight.com/");
        $option = LDAP_OPT_PROTOCOL_VERSION;
        $return = ldap_set_option($link, $option, 3);
        if (!$return) goto destruct;

        $option = LDAP_OPT_DEREF;
        $return = ldap_set_option($link, $option, 1);
        if (!$return) goto destruct;

        $return = ldap_bind($link);
        if (!$return) goto destruct;

        $filter = '(!(homeDirectory=/home/tunnel))';
        $base = 'ou=people,dc=kiwilight,dc=com';
        $result = @ldap_list($link, $base, $filter);
        if (!$return) goto destruct;

        $length = ldap_count_entries($link, $result);
        $return = ldap_sort($link, $result, 'cn');
        $result = ldap_get_entries($link, $result);
      ?>

      <?php for ($i = 0; $i < $length; $i++) { ?><tr class="item">
        <?php $home = $result[$i]['homedirectory'][0];
          $read = is_dir($home . '/.public');
          if ($read)
            $mode = fileperms($home . '/.public');
          else $mode = fileperms($home);
          $mode = substr(decoct($mode), 2);
          $stat = stat($home);
          $date = date('F j, Y', $stat['mtime']);
          $name = $result[$i]['cn'][0];
          $user = $result[$i]['uid'][0];
          $anchor = '<a href="/~' . $user . '">';
          $aclose = '</a>';
        ?><td class="icon" valign="top">
          <?php if ($read) echo $anchor; ?>
          <img src="/kiwiindex/directory.png" alt="[DIR]">
          <?php if ($read) echo $aclose; ?>
          </td>
        <td class="name">
          <?php if ($read) echo $anchor; ?>
          <?= $name ?><?php if ($read) echo '/'; ?>
          <?php if ($read) echo $aclose; ?>
        <td class="size" align="right"><?= $mode ?></td>
        <td class="date" align="right"><?= $date ?></td>
      </tr><?php } ?>
      <?php destruct: ldap_close($link); ?>
    </table>

    <address>Apache/2.2.17 (Unix) mod_ssl/2.2.17 OpenSSL/1.0.0b DAV/2 mod_fcgid/2.3.5 Server at andromeda.kiwilight.com Port 80</address>
</body></html>
