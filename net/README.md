# OSEDA Networking

## Apache
Use the `oseda.conf` file here as the web server configuration file. Will need to be softlinked into the proper directory.

```bash
# link this repo file to apache directory
sudo ln -s oseda.conf /etc/apache2/sites-available/oseda.conf

sudo a2ensite oseda.conf # enable site (should do some softlinking to sites-enabled)

# restart apache
sudo systemctl restart apache2
```

## Firewall
At some point, would like a semi-declarative firewall configuration script in this directory
