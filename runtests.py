"""
Standalone test runner for wardrounds plugin
"""
import os
import sys

from django.conf import settings

settings.configure(DEBUG=True,
                   DATABASES={
                       'default': {
                           'ENGINE': 'django.db.backends.sqlite3',
                       }
                   },
                   OPAL_OPTIONS_MODULE = 'wardround.tests.dummy_options_module',
                   ROOT_URLCONF='wardround.urls',
                   INSTALLED_APPS=('django.contrib.auth',
                                   'django.contrib.contenttypes',
                                   'django.contrib.sessions',
                                   'django.contrib.admin',
                                   'opal',
                                   'wardround',))

from wardround.tests import dummy_options_module

from django.test.simple import DjangoTestSuiteRunner
test_runner = DjangoTestSuiteRunner(verbosity=1)
failures = test_runner.run_tests(['wardround', ])
if failures:
    sys.exit(failures)