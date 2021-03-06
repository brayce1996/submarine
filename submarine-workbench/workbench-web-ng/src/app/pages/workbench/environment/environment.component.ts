/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Component, OnInit } from '@angular/core';
import { Environment } from '@submarine/interfaces/environment-info';
import { EnvironmentService } from '@submarine/services/environment.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'submarine-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit {
  constructor(
    private environmentService: EnvironmentService,
    private nzMessageService: NzMessageService) {}

  environmentList: Environment[] = [];
  checkedList: boolean[] = [];
  selectAllChecked: boolean = false;

  ngOnInit() {
    this.fetchEnvironmentList();
  }

  fetchEnvironmentList() {
    this.environmentService.fetchEnvironmentList().subscribe((list) => {
      this.environmentList = list;
      this.checkedList = [];
      for (let i = 0; i < this.environmentList.length; i++) {
        this.checkedList.push(false);
      }
    });
  }

  // TODO(kobe860219): Create new environment
  createEnvironment(data) {}

  // TODO(kobe860219): Update an environment
  updateEnvironment(id: string, data) {}

  onDeleteEnvironment(name: string, onMessage: boolean) {
    this.environmentService.deleteEnvironment(name).subscribe(
      () => {
        if (onMessage === true) {
          this.nzMessageService.success('Delete Experiment Successfully!');
        }
        this.fetchEnvironmentList();
      },
      (err) => {
        if (onMessage === true) {
          this.nzMessageService.error(err.message);
        }
      }
    );
  }

  deleteEnvironments() {
    for (let i = this.checkedList.length - 1; i >= 0; i--) {
      console.log(this.environmentList[i].environmentSpec.name)
      if (this.checkedList[i] === true) {
        this.onDeleteEnvironment(this.environmentList[i].environmentSpec.name, false);
      }
    }

    this.selectAllChecked = false;
  }

  selectAllEnv() {
    for (let i = 0; i < this.checkedList.length; i++) {
      this.checkedList[i] = this.selectAllChecked;
    }
  }
}
